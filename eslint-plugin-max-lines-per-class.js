module.exports = {
  rules: {
    'max-lines-per-class': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'enforce a maximum number of lines per class',
          category: 'Best Practices',
          recommended: false,
        },
        schema: [
          {
            type: 'object',
            properties: {
              max: {
                type: 'integer',
                minimum: 1,
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const maxLines = (context.options[0] && context.options[0].max) || 300;

        return {
          ClassDeclaration(node) {
            const sourceCode = context.getSourceCode();
            const classText = sourceCode.getText(node);
            const lines = classText.split('\n');

            const nonCommentNonEmptyLines = lines.filter((line) => {
              const trimmedLine = line.trim();

              return trimmedLine && !trimmedLine.startsWith('//') && !trimmedLine.startsWith('/*');
            }).length;

            if (nonCommentNonEmptyLines > maxLines) {
              context.report({
                node,
                message: `Class exceeds maximum non-empty non-comment line limit of ${maxLines}. It has ${nonCommentNonEmptyLines} lines.`,
              });
            }
          },
        };
      },
    },
  },
};
