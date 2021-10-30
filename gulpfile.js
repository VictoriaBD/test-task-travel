const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');

function buildStyles() {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}

function compileTwig() {
    const twig = require('gulp-twig');
    return gulp.src('src/index.twig')
        .pipe(twig({
            data: {
                title: 'Test task',
                journal: [
                    {
						'picture_class': 'block_01',
						'text_class': 'block_01',
						'picture_name': 'journal-love.png',
						'title_h5': 'Love',
						'title_h3': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do',
						'text': 'You know how to make best coffee in the universe? Or, maybe you’re very good in designing gloves? Tell everyone about your experience and skills.',
						'number': '01'
					},
					{
						'picture_class': 'block_03',
						'text_class': 'block_02',
						'picture_name': 'journal-water.png',
						'title_h5': 'Tree',
						'title_h3': 'Lorem ipsum dolor sit amet, <del>consectetur</del> adipisicing elit,',
						'text': 'The way to a successful brand is hard, but always very interesting. Share the full story of your project – from the very first day until now.',
						'number': '02'
					},
					{
						'picture_class': 'block_02',
						'text_class': 'block_03',
						'picture_name': 'journal-tree.png',
						'title_h5': 'Water',
						'title_h3': 'Little pieces of our proudness',
						'text': 'What do you do better than your competitors? What are you proud of? What details and advantages of your product you want people to know about?',
						'number': '03'
					}
				],
				travels: [
					{
						'block_class': 'block_01',
						'bg_image': 'mountains-1.jpg',
						'stars': 'stars-4.png',
						'title': 'Carpathian',
						'text': 'Lorem ipsum dolor si amet, consectetur adip',
						'old_price': '3150$',
						'new_price': '$793'
					},
					{
						'block_class': 'block_02',
						'bg_image': 'mountains-2.jpg',
						'stars': 'stars-5.png',
						'title': 'Alps',
						'text': 'Lorem ipsum dolor si amet, consectetur adip',
						'old_price': '3150$',
						'new_price': '$1893'
					},
					{
						'block_class': 'block_03',
						'bg_image': 'mountains-3.jpg',
						'stars': 'stars-5.png',
						'title': 'Pyrenees',
						'text': 'Lorem ipsum dolor si amet, consectetur adip',
						'old_price': '3150$',
						'new_price': '$2593'
					},
					{
						'block_class': 'block_04',
						'bg_image': 'mountains-4.jpg',
						'stars': 'stars-5.png',
						'title': 'Rocky',
						'text': 'Lorem ipsum dolor si amet, consectetur adip',
						'old_price': '3150$',
						'new_price': '$2123'
					},
					{
						'block_class': 'block_05',
						'bg_image': 'mountains-5.jpg',
						'stars': 'stars-3.png',
						'title': 'Kavkaz',
						'text': 'Lorem ipsum dolor si amet, consectetur adip',
						'old_price': '3150$',
						'new_price': '$593'
					}
				]
            }
        }))
        .pipe(gulp.dest('dist/'));
}

function copyImages() {
	return gulp.src('src/img/**/*', { base: 'src' })
		.pipe(gulp.dest('dist'))
}

function cleanDist() {
	return del('dist/**/*', { force: true })
}

exports.watch = function () {
    gulp.watch('src/sass/**/*.sass', buildStyles);
	gulp.watch('src/img/**/*', copyImages);
	gulp.watch('src/*.twig', compileTwig);
};
exports.build = gulp.series(cleanDist, buildStyles, compileTwig, copyImages);