import React, { Component } from "react";
import "./styles.scss";

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    fetch("//wp-reb-2.herokuapp.com/wp-json/wp/v2/posts")
      .then(results => results.json())
      .then(posts => {
        const mappedPosts = posts.map(post => {
          return {
            id: post.id,
            content: post.content,
            title: post.title,
            slug: post.slug,
            author: post.author,
            cats: post.categories,
            tags: post.tags,
            type: post.type,
          };
        });

        this.setState({
          posts: mappedPosts,
        });
      });
  }
  render() {
    const { posts } = this.state;

    return (
      <div>
        <ul className="posts">
          {posts.map(post => (
            <li className="post" key={post.id}>
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
