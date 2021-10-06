// PM2 Discord bot configurations
module.exports = {
  apps: [
    {
      name: 'Sunib-Worker',
      script: './src/index.ts',
      instances: 1,
      exec_mode: 'cluster',
      watch: true,
      ignore_watch: ['node_modules', '.git', 'dist'],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
