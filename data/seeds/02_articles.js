
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('articles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {id: 1, user_id: 1, title: 'Article 1', category: 'stuff', article_url: 'https://google.com', image_url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', summary: 'About Google.'},
        {id: 2, user_id: 1, title: 'Lambda School', category: 'learning', article_url: 'http://lambdaschool.com', image_url: 'https://assets-global.website-files.com/5cd091cfb5499f22bdf72905/5dcda59e63bb6ae5c9282801_small-red-logo.png', summary: 'About Lambda.'},
        {id: 3, user_id: 2, title: 'Article 2', category: 'more stuff', article_url: 'https://google.com', image_url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', summary: 'About Google.'},
      ]);
    });
};
