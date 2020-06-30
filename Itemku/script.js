function solutionOne(record) {
  const userObj = record.reduce((acc, curr) => {
    const [action, userID, userName] = curr.split(' ');
    const userData = { action: action.toLowerCase(), userID, userName };
    const changedUser =
      acc.findIndex(
        u =>
          u.userID === userID &&
          u.userName !== userName &&
          u.action.toLowerCase() !== 'leave',
      ) !== -1;

    if (action.toLowerCase() === 'change') {
      return acc.map(u => {
        if (u.userID === userID) return { ...u, userName };
        return u;
      });
    }
    if (changedUser) {
      const newArr = acc.map(u => {
        if (u.userID === userID) return { ...u, userName };
        return u;
      });
      return [...newArr, userData];
    }
    return [...acc, userData];
  }, []);

  return userObj.map(
    u => `${u.userName} ${u.action === 'enter' ? 'came in' : 'has left'}`,
  );
}

function solutionTwo(N, users) {
  if (N < 1 || N > 500) return console.error('round must be 1-500');
  if (users.length < 1 || users.length > 200000)
    return console.error('participating users must be between 1-200000');

  const passedUser = [];
  let totalPassed = users.length;
  for (let i = 0; i < N; i++) {
    const stage = i + 1;
    const arrPassed = users.filter(u => u === stage);
    const user = {
      stage,
      failure: (arrPassed.length / totalPassed) * 100,
    };
    totalPassed -= arrPassed.length;
    passedUser.push(user);
  }
  return passedUser
    .sort((a, b) => {
      if (a.failure === b.failure) return a.stage - b.stage;
      return a.failure < b.failure ? 1 : -1;
    })
    .map(u => u.stage);
}

function solution(relation) {
  const relCol = relation.reduce((acc, curr) => {
    return acc.map((item, idx) => {
      if (typeof item === 'string') return [item, curr[idx]];
      return [...item, curr[idx]];
    });
  });
  const keyArr = relCol.reduce((acc, curr) => {
    const uni = curr.filter((v, i, a) => a.indexOf(v) !== i);
    return [...acc, uni.length];
  }, []);
  const superKey = keyArr.filter(v => v === 0).length;
  const candKey = keyArr.filter((v, i, a) => a.indexOf(v) === i).length;
  return superKey + (keyArr.length - candKey);
}
