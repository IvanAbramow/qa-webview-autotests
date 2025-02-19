module.exports = {
  rules: {
    'todo-link': {
      create(context) {
        return {
          Program(node) {
            const sourceCode = context.getSourceCode();
            const comments = sourceCode.getAllComments();

            comments.forEach((comment) => {
              const value = comment.value.trim();

              if (value.startsWith('TODO') && !/\bhttps?:\/\/\S+/i.test(value)) {
                context.report({
                  node: comment,
                  message:
                    'TODO comments must include a link to a task. Example: https://jira.twiket.com/browse/QA-1234',
                });
              }
            });
          },
        };
      },
    },
  },
};
