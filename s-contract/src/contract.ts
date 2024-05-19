// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

type Article = {
  id: string;
  author: string;
  title: string;
  createdAt: string; // Date and time in ISO 8601 format
  content: string;
};

@NearBindgen({})
class ArticleContract {
  articles: Article[] = [];

  @view({})
  get_article({ id }: { id: string }): Article | null {
    return this.articles.find(article => article.id === id) || null;
  }

  @view({})
  get_all_articles(): Article[] {
    return this.articles;
  }

  @call({}) // This method changes the state, for which it costs gas
  add_article({ id, author, title, createdAt, content }: Article): void {
    const newArticle: Article = { id, author, title, createdAt, content };
    near.log(`Adding article: ${title} by ${author}`);
    this.articles.unshift(newArticle);
  }

  @call({}) // This method changes the state, for which it costs gas
  delete_article({ id }: { id: string }): void {
    this.articles = this.articles.filter(article => article.id !== id);
  }

  
}

@NearBindgen({})
class HelloNear {
  greeting: string = 'Hello';

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }
}




// // Find all our documentation at https://docs.near.org
// import { NearBindgen, near, call, view } from 'near-sdk-js';

// type Article = {
//   id: string;
//   author: string;
//   title: string;
//   createdAt: string; // Date and time in ISO 8601 format
//   content: string;
// };

// @NearBindgen({})
// class ArticleContract {
//   articles: Article[] = []; // Initialize empty array

//   @view({})
//   get_article({ id }: { id: string }): Article | null {
//     return this.articles.find(article => article.id === id) || null;
//   }

//   @call({}) // This method changes the state, for which it costs gas
//   add_article({ id, author, title, createdAt, content }: Article): void {
//     const newArticle: Article = { id, author, title, createdAt, content };
//     near.log(`Adding article: ${title} by ${author}`);
//     if (this.articles) {
//       this.articles.unshift(newArticle);
//     }
//     else {
//       this.articles = [newArticle];
//     }
//   }
// }

// @NearBindgen({})
// class HelloNear {
//   greeting: string = 'Hello';

//   @view({}) // This method is read-only and can be called for free
//   get_greeting(): string {
//     return this.greeting;
//   }

//   @call({}) // This method changes the state, for which it cost gas
//   set_greeting({ greeting }: { greeting: string }): void {
//     near.log(`Saving greeting ${greeting}`);
//     this.greeting = greeting;
//   }
// }