export async function polling(server, onStop, condition, duration = 1000) {
  // 该 sleep 函数的主要目的是在异步代码中实现延迟执行。
  // 通过返回一个 Promise，调用者可以使用 await 关键字来
  // 暂停当前的异步操作，直到延迟时间结束，在异步任务(setTimeout)执行成功的回调(resolve)
  // Promise 被解决。
  const sleep = (duration) => {
    // 等待时间不存在失败
    // 创建一个 Promise 设置一个延时器，在1s钟之后 执行resolve，当前Promise被满足
    // 返回成功的Promise结果
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };

  //返回请求结果
  let result = await server();
  // 判断轮训状态
  // 如果状态码是 800(二维码已经过期) 或者 803(登录成功) 就停止轮巡
  while (!condition(result)) {
    // 等到上次轮巡的结果返回后再发送下一次请求
    await sleep(duration);
    result = await server();
    console.log('🚀 ~ App.vue:135 ~ polling ~ result:', result);
  }
  // 请求失败，传入失败的结果给回调函数并执行
  onStop(result);
}
