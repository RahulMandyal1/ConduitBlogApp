import React, { Component } from "react";

export default class Singlepost extends Component {
  state = {
    article: null,
  };
  render() {
    console.log(this.props);
    return (
      <>
        <section className="singlepost-container">
          <article className="singlepost-wrapper">
            <div className="article-bannar-container">
              <div className="article-bannar flex-col">
                <h2 className="title">
                  This is the title of the article so read it thoroughly.
                </h2>
                <div className="additionalInfo-container flex-row">
                  <div className="userinfo-container flex-row">
                    <figure>
                      <img src="/images/smiley-cyrus.jpg" alt="userprofile" />
                    </figure>
                    <div className="username-date">
                      <h4>username here </h4>
                      <time>
                        <p className="post-time">Fri jun 03 2022</p>
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="articlebody-container">
              <p className="article-body">
                Messi has struggled to produce his best form in his first season
                in French football since joining Paris Saint-Germain from
                Barcelona last summer. The 34-year-old has scored just four
                goals in Ligue 1 but has managed to provide 13 assists for PSG,
                who were crowned French champions last weekend following a 1-1
                draw with Lens.
              </p>
            </div>
          </article>
        </section>
      </>
    );
  }
}
