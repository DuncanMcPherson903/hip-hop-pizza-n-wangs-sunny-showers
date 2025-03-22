const isAuthorizedUser = (userId) => {
  switch (userId) {
    case 'CiGC3DY5YpfEQbLocTJpsAJBp6n1':
      return true;
    case 'Io34NWuZz2cS6JgqEc16nm3rkrp1':
      return true;
    case 'HLc15PD6EYRsaLaDvRbssIzEuLw1':
      return true;
    case '7V4LZjF1A2Z1cYBMRsoLzll9XEX2':
      return true;
    default:
      return false;
  }
};

export default isAuthorizedUser;
