import React from "react";

import MenuItem from "../menu-item/menu-item";

import "./directory.styles.scss";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "kittens",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/cat-animal-rescue-db.appspot.com/o/kitten-Cover.png?alt=media&token=dfcf229d-6e2e-4385-a073-6bc4a95327bb",
          id: 1,
          linkUrl: "kittens",
        },
        {
          title: "puppies",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/cat-animal-rescue-db.appspot.com/o/puppy-cover.jpg?alt=media&token=98c734ef-6022-4f0c-96f0-5008f58722b2",
          id: 2,
          linkUrl: "puppies",
        },
        {
          title: "seniors",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/cat-animal-rescue-db.appspot.com/o/veteran-cover.jpg?alt=media&token=0b7e4e42-dfe0-4223-b1f1-9c1632ed870a",
          id: 3,
          linkUrl: "seniors",
        },
        {
          title: "dogs",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/cat-animal-rescue-db.appspot.com/o/dog-cover.jpg?alt=media&token=31897bae-2371-4c61-a0a7-12ae8fd0eb0d",
          size: "large",
          id: 4,
          linkUrl: "dogs",
        },
        {
          title: "cats",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/cat-animal-rescue-db.appspot.com/o/cat-cover.jpg?alt=media&token=6e8d8693-353e-483d-a45b-58a09558af37",
          size: "large",
          id: 5,
          linkUrl: "cats",
        },
      ],
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
