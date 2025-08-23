// biome-ignore-all lint: SST is globally available

export const isPermanentStage = ['production', 'dev'].includes($app.stage);
