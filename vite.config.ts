import react from '@vitejs/plugin-react';
// import path from 'path';

import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			// '@': path.resolve(__dirname, './src'),
			// '@components': path.resolve(__dirname, './src/components'),
			// '@assets': path.resolve(__dirname, './src/assets'),
			// '@pages': path.resolve(__dirname, './src/pages'),
			// '@hooks': path.resolve(__dirname, './src/hooks'),
			// '@utils': path.resolve(__dirname, './src/utils'),
			// '@types': path.resolve(__dirname, './src/types'),
			// '@app': path.resolve(__dirname, './src/app'),
			// '@constants': path.resolve(__dirname, './src/constants'),
			// '@models': path.resolve(__dirname, './src/models'),
		},
	},
});
