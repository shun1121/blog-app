import { createClient } from 'newt-client-js';

export const client = createClient({
  spaceUid: 'space-shunsuke',
  token: process.env.API_KEY || "",
  apiType: 'api'
});

// client
//   .getContent({
//     appUid: 'blog',
//     modelUid: 'article',
//     contentId: '627791ca280c8b001810e07a'
//   })
//   .then((content) => console.log(content))
//   .catch((err) => console.log(err));