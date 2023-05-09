module.exports = {
    testEnvironment: 'node', // ou 'jsdom' para testar aplicações web
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'], // Padrões de arquivo de teste
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transforma arquivos .js e .jsx usando o babel-jest
    },
  };
  