function bitwise(a, b) {
  const x = BigInt(a), y = BigInt(b);
  return { xor: x ^ y, or: x | y, and: x & y };
}
