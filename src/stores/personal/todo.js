export default {
  namespaced: true,
  state: {
    // 状态 0：待办（初始状态），1：进行中，2：已完成，3：已拒绝，4：待定，5：超时
    status: [
      {
        label: 'personal.todo.status_init',
        value: 0,
        colors: ["#f0f0f0", "#bfbfbf", "#8c8c8c"] // [gray-4, gray-6, gray-7]
      },
      {
        label: 'personal.todo.status_processing',
        value: 1,
        colors: ["#69c0ff", "#1890ff", "#096dd9"] // [blue-4, blue-6, blue-7]
      },
      {
        label: 'personal.todo.status_completed',
        value: 2,
        colors: ["#95de64", "#52c41a", "#389e0d"] // [green-4, green-6, green-7]
      },
      {
        label: 'personal.todo.status_rejected',
        value: 3,
        colors: ["#ff9c6e", "#fa541c", "#d4380d"] // [volcano-4, volcano-6, volcano-7]
      },
      {
        label: 'personal.todo.status_pending',
        value: 4,
        colors: ["#fff566", "#fadb14", "#d4b106"] // [yellow-4, yellow-6, yellow-7]
      },
      {
        label: 'personal.todo.status_overtime',
        value: 5,
        colors: ["#ff7875", "#f5222d", "#cf1322"] // [red-4, red-6, red-7]
      }
    ],
    // 优先级 1：低，2：普通，3：高，4：紧急，5：非常紧急
    priorities: [
      {
        label: 'personal.todo.priority_low',
        value: 1,
        colors: ["#69c0ff", "#1890ff", "#096dd9"] // [blue-4, blue-6, blue-7]
      },
      {
        label: 'personal.todo.priority_normal',
        value: 2,
        colors: ["#95de64", "#52c41a", "#389e0d"] // [green-4, green-6, green-7]
      },
      {
        label: 'personal.todo.priority_high',
        value: 3,
        colors: ["#fff566", "#fadb14", "#d4b106"] // [yellow-4, yellow-6, yellow-7]
      },
      {
        label: 'personal.todo.priority_urgent',
        value: 4,
        colors: ["#ffc069", "#fa8c16", "#d46b08"] // [orange-4, orange-6, orange-7]
      },
      {
        label: 'personal.todo.priority_immediate',
        value: 5,
        colors: ["#ff7875", "#f5222d", "#cf1322"] // [red-4, red-6, red-7]
      }
    ]
  },
  mutations: {
    updateStatus(state, status) {
      state.status = status
    },
  },
  actions: {
    updateStatus(context, status) {
      context.commit('updateStatus', status)
    },
  }
}
