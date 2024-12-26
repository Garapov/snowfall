import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/snowfall.js',
                format: 'es',
                sourcemap: true
            },
            {
                file: 'dist/snowfall.min.js',
                format: 'es',
                plugins: [terser()],
                sourcemap: true
            },
            {
                file: 'dist/snowfall.umd.js',
                format: 'umd',
                name: 'SnowfallCanvas',
                exports: 'default',
                sourcemap: true
            },
            {
                file: 'dist/snowfall.umd.min.js',
                format: 'umd',
                name: 'SnowfallCanvas',
                exports: 'default',
                plugins: [terser()],
                sourcemap: true
            }
        ],
        plugins: [
            nodeResolve()
        ]
    }
];