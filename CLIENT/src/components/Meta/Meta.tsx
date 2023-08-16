import React from "react";
import { Helmet } from "react-helmet";

interface MetaProps {
  title: string;
}

const Meta: React.FC<MetaProps> = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
    </div>
  );
};

export default Meta;
