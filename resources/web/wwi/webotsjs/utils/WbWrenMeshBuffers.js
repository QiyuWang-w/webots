import {WbVector4} from "./WbVector4.js"
import {WbVector3} from "./WbVector3.js"

class WbWrenMeshBuffers {
  constructor(verticesCount, indicesCount, texCoordSetsCount, colorBufferSize) {
    this.vertexBuffer = null;
    this.normalBuffer = null;
    this.colorBuffer = null;
    this.texCoordBuffer = null;
    this.unwrappedTexCoordsBuffer = null;
    this.indexBuffer = null;

    this.vertexIndex = 0;
    this.index = 0;
    this.colorIndex = 0;

    this.texCoordSetsCount = texCoordSetsCount;
    this.verticesCount = verticesCount;
    this.indicesCount = indicesCount;

    this.isExternalVertexBuffer = false;
    this.isExternalNormalBuffer = false

    this.resetAll(verticesCount, indicesCount, this.texCoordSetsCount, colorBufferSize);
  }

  resetAll(verticesCount, indicesCount, texCoordSetsCount, colorBufferSize) {
    this.clear();

    this.verticesCount = verticesCount;
    this.indicesCount = indicesCount;
    this.texCoordSetsCount = texCoordSetsCount;
    this.vertexBuffer = [];
    this.normalBuffer = [];
    if (texCoordSetsCount > 0) {
      this.texCoordBuffer = [];
      this.unwrappedTexCoordsBuffer = [];
    }
    this.indexBuffer = [];
    this.colorBufferSize = colorBufferSize;
    if (colorBufferSize > 0)
      this.colorBuffer = [];
  }

  clear() {
    this.deleteVertexBuffer();
    this.deleteNormalBuffer();
    this.deleteColorBuffer();
    this.deleteTexCoordBuffer();
    this.deleteIndexBuffer();
  }

  deleteVertexBuffer() {
    this.vertexBuffer = undefined;
    this.vertexIndex = 0;
    this.isExternalVertexBuffer = false;
  }

  deleteNormalBuffer() {
    this.normalBuffer = undefined;
    this.isExternalNormalBuffer = false;
  }

  deleteColorBuffer() {
    this.colorBuffer = undefined;
  }

  deleteTexCoordBuffer() {
    this.texCoordBuffer = undefined;
    this.unwrappedTexCoordsBuffer = undefined;
  }

  deleteIndexBuffer() {
    this.indexBuffer = undefined;
    this.index = 0;
  }

  static writeCoordinates(x, y, z, m, buffer, index) {
    let result = m.mulByVec4(new WbVector4(x, y, z, 1.0));
    buffer[index] = result.x;
    buffer[index + 1] = result.y;
    buffer[index + 2] = result.z;
  }

  static writeNormal(x, y, z, m, buffer, index) {
    let result = m.mulByVec3(new WbVector3(x, y, z));
    buffer[index] = result.x;
    buffer[index + 1] = result.y;
    buffer[index + 2] = result.z;
  }
}

export {WbWrenMeshBuffers}
