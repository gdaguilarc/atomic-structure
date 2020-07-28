THREE.Vector3.prototype.normalizeAndMultiplyScalar = function (scalar) {
  this.normalize();
  this.multiplyScalar(scalar);
};
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;;
}