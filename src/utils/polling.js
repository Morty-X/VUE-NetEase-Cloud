// code === 800 / 803
// 轮询的逻辑，轮询停止后的回调函数，轮询停止的条件，轮询间隔
export async function polling(service, onstop, condition, duration = 1000) {
  const sleep = (duration) => {
    return new Promise((resolve) => window.setTimeout(resolve, duration));
  };
  let result = await service().catch((err) => {
    console.log(err);
  });
  while (!condition(result)) {
    await sleep(duration);
    result = await service();
  }
  onstop(result);
}
