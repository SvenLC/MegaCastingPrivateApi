"use strict";

const bigint = require('./bigint');

const SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
const SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
const UNKNOWN_PLP_LEN = Buffer.from([0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
const ZERO_LENGTH_BUFFER = Buffer.alloc(0);

/*
  A Buffer-like class that tracks position.

  As values are written, the position advances by the size of the written data.
  When writing, automatically allocates new buffers if there's not enough space.
 */
module.exports = class WritableTrackingBuffer {
  constructor(initialSize, encoding, doubleSizeGrowth) {
    this.initialSize = initialSize;
    this.encoding = encoding || 'ucs2';
    this.doubleSizeGrowth = doubleSizeGrowth || false;
    this.buffer = Buffer.alloc(this.initialSize, 0);
    this.compositeBuffer = Buffer.alloc(0);
    this.position = 0;
  } // $FlowFixMe: Flow does not like getter/setters that have side-effects.


  get data() {
    this.newBuffer(0);
    return this.compositeBuffer;
  }

  copyFrom(buffer) {
    const length = buffer.length;
    this.makeRoomFor(length);
    buffer.copy(this.buffer, this.position);
    this.position += length;
  }

  makeRoomFor(requiredLength) {
    if (this.buffer.length - this.position < requiredLength) {
      if (this.doubleSizeGrowth) {
        let size = Math.max(128, this.buffer.length * 2);

        while (size < requiredLength) {
          size *= 2;
        }

        this.newBuffer(size);
      } else {
        this.newBuffer(requiredLength);
      }
    }
  }

  newBuffer(size) {
    const buffer = this.buffer.slice(0, this.position);
    this.compositeBuffer = Buffer.concat([this.compositeBuffer, buffer]);
    this.buffer = size === 0 ? ZERO_LENGTH_BUFFER : Buffer.alloc(size, 0);
    this.position = 0;
  }

  writeUInt8(value) {
    const length = 1;
    this.makeRoomFor(length);
    this.buffer.writeUInt8(value, this.position);
    this.position += length;
  }

  writeUInt16LE(value) {
    const length = 2;
    this.makeRoomFor(length);
    this.buffer.writeUInt16LE(value, this.position);
    this.position += length;
  }

  writeUShort(value) {
    this.writeUInt16LE(value);
  }

  writeUInt16BE(value) {
    const length = 2;
    this.makeRoomFor(length);
    this.buffer.writeUInt16BE(value, this.position);
    this.position += length;
  }

  writeUInt24LE(value) {
    const length = 3;
    this.makeRoomFor(length);
    this.buffer[this.position + 2] = value >>> 16 & 0xff;
    this.buffer[this.position + 1] = value >>> 8 & 0xff;
    this.buffer[this.position] = value & 0xff;
    this.position += length;
  }

  writeUInt32LE(value) {
    const length = 4;
    this.makeRoomFor(length);
    this.buffer.writeUInt32LE(value, this.position);
    this.position += length;
  }

  writeInt64LE(value) {
    const buf = bigint.numberToInt64LE(value);
    this.copyFrom(buf);
  }

  writeUInt32BE(value) {
    const length = 4;
    this.makeRoomFor(length);
    this.buffer.writeUInt32BE(value, this.position);
    this.position += length;
  }

  writeUInt40LE(value) {
    // inspired by https://github.com/dpw/node-buffer-more-ints
    this.writeInt32LE(value & -1);
    this.writeUInt8(Math.floor(value * SHIFT_RIGHT_32));
  }

  writeUInt64LE(value) {
    this.writeInt32LE(value & -1);
    this.writeUInt32LE(Math.floor(value * SHIFT_RIGHT_32));
  }

  writeInt8(value) {
    const length = 1;
    this.makeRoomFor(length);
    this.buffer.writeInt8(value, this.position);
    this.position += length;
  }

  writeInt16LE(value) {
    const length = 2;
    this.makeRoomFor(length);
    this.buffer.writeInt16LE(value, this.position);
    this.position += length;
  }

  writeInt16BE(value) {
    const length = 2;
    this.makeRoomFor(length);
    this.buffer.writeInt16BE(value, this.position);
    this.position += length;
  }

  writeInt32LE(value) {
    const length = 4;
    this.makeRoomFor(length);
    this.buffer.writeInt32LE(value, this.position);
    this.position += length;
  }

  writeInt32BE(value) {
    const length = 4;
    this.makeRoomFor(length);
    this.buffer.writeInt32BE(value, this.position);
    this.position += length;
  }

  writeFloatLE(value) {
    const length = 4;
    this.makeRoomFor(length);
    this.buffer.writeFloatLE(value, this.position);
    this.position += length;
  }

  writeDoubleLE(value) {
    const length = 8;
    this.makeRoomFor(length);
    this.buffer.writeDoubleLE(value, this.position);
    this.position += length;
  }

  writeString(value, encoding) {
    if (encoding == undefined) {
      encoding = this.encoding;
    }

    const length = Buffer.byteLength(value, encoding);
    this.makeRoomFor(length); // $FlowFixMe https://github.com/facebook/flow/pull/5398

    this.buffer.write(value, this.position, encoding);
    this.position += length;
  }

  writeBVarchar(value, encoding) {
    this.writeUInt8(value.length);
    this.writeString(value, encoding);
  }

  writeUsVarchar(value, encoding) {
    this.writeUInt16LE(value.length);
    this.writeString(value, encoding);
  } // TODO: Figure out what types are passed in other than `Buffer`


  writeUsVarbyte(value, encoding) {
    if (encoding == undefined) {
      encoding = this.encoding;
    }

    let length;

    if (value instanceof Buffer) {
      length = value.length;
    } else {
      value = value.toString();
      length = Buffer.byteLength(value, encoding);
    }

    this.writeUInt16LE(length);

    if (value instanceof Buffer) {
      this.writeBuffer(value);
    } else {
      this.makeRoomFor(length); // $FlowFixMe https://github.com/facebook/flow/pull/5398

      this.buffer.write(value, this.position, encoding);
      this.position += length;
    }
  }

  writePLPBody(value, encoding) {
    if (encoding == null) {
      encoding = this.encoding;
    }

    let length;

    if (value instanceof Buffer) {
      length = value.length;
    } else {
      value = value.toString();
      length = Buffer.byteLength(value, encoding);
    } // Length of all chunks.
    // this.writeUInt64LE(length);
    // unknown seems to work better here - might revisit later.


    this.writeBuffer(UNKNOWN_PLP_LEN); // In the UNKNOWN_PLP_LEN case, the data is represented as a series of zero or more chunks.

    if (length > 0) {
      // One chunk.
      this.writeUInt32LE(length);

      if (value instanceof Buffer) {
        this.writeBuffer(value);
      } else {
        this.makeRoomFor(length); // $FlowFixMe https://github.com/facebook/flow/pull/5398

        this.buffer.write(value, this.position, encoding);
        this.position += length;
      }
    } // PLP_TERMINATOR (no more chunks).


    this.writeUInt32LE(0);
  }

  writeBuffer(value) {
    const length = value.length;
    this.makeRoomFor(length);
    value.copy(this.buffer, this.position);
    this.position += length;
  }

  writeMoney(value) {
    this.writeInt32LE(Math.floor(value * SHIFT_RIGHT_32));
    this.writeInt32LE(value & -1);
  }

};