module.exports = function (grunt) {
    grunt.initConfig({
            watch: {
                appFrontWatch: {
                    files: ['src/**/*.ts'],
                    tasks: ['ts:base']
                }
            },
            ts: {
              base: {
                options: {
                  module: 'system', 
                  moduleResolution: 'node',
                  target: 'es2015',
                  experimentalDecorators: true,
                  emitDecoratorMetadata: true,
                  noImplicitAny: false
                },
                files: [{ src: ['src/**/*.ts'], dest: 'dist/tct.js' }]
              }
            }
                                                             
         }
    );
    //grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
   // grunt.loadNpmTasks('grunt-string-replace');
    //grunt.loadNpmTasks('grunt-closure-tools');   
    //grunt.loadNpmTasks('grunt-import');
    grunt.loadNpmTasks("grunt-ts");
    //grunt.loadNpmTasks("grunt-systemjs-builder");
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-teamcity');
    //grunt.registerTask('dev', [ 'copy:dev', 'compass:appFront', 'string-replace:appTemplates']);
    //grunt.registerTask('build', [ 'teamcity', 'ts:base', 'compass:appFrontProd', 'string-replace:appTemplates' ,'copy:prod', 'systemjs', 'import', 'closureCompiler:app']);
    //grunt.registerTask('production', [ 'import', 'compass:connectFrontProd', 'string-replace:one', 'closureCompiler:connect']);
};