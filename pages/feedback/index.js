import React, { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  };
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <div>
        <ul>
          {props.feedbackItems.map((item) => {
            return (
              <li key={item.id}>
                {item.feedback}
                <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                  Show Details
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: { feedbackItems: data },
    revalidate: 180,
  };
}

export default FeedbackPage;
