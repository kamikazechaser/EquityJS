   /**
     * EquityJs
     *
     * A Node.js Library For The Equity Eazzy API 
     * 
     * Mohammed Sohail <sohailsameja@gmail.com>
     * Released Under AGPL-v3 License
     *
     */

   /**
     * Node.js Dependencies
     *
     */
const loadTasks = require("load-grunt-tasks");

exports = module.exports = function(grunt) {
    loadTasks(grunt);

    grunt.initConfig({
        eslint: {
            target: [
                "index.js"
            ],
        },
        mochaTest: {
            src: ["test.js"],
        },
    });

    grunt.registerTask("lint", ["eslint"]);
    grunt.registerTask("test", ["lint", "mochaTest"]);
};