THREE.Vector3.prototype.normalizeAndMultiplyScalar = function (scalar) {
  this.normalize();
  this.multiplyScalar(scalar);
};
