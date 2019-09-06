import React from "react";
import { Box, Button, Image } from "grommet";
import { Storage } from "aws-amplify";

const FOLDER_NAME = "bus-captured";

/* Image with lazy loading from image key.
 */
const LayzyImage = ({ imageKey }) => {
  const [url, setUrl] = React.useState(null);

  const loadImageUrl = async imageKey => {
    let url = await Storage.get(imageKey);
    setUrl(url);
  };

  React.useEffect(() => {
    loadImageUrl(imageKey);
  }, [imageKey]);

  return (
    <Box
      width="250px"
      height="250px"
      flex={false}
      margin={{ horizontal: "16px" }}
    >
      <Image src={url} fit="cover" />
    </Box>
  );
};

/* View image from the `public/FOLDER_NAME`.
 * Access public access level user images.
 * https://aws-amplify.github.io/docs/js/storage#file-access-levels
 */
const StorageViewer = () => {
  const [imageKeys, setImageKeys] = React.useState([]);

  React.useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = () => {
    Storage.list(FOLDER_NAME)
      .then(result => setImageKeys(result.map(r => r.key)))
      .catch(err => {
        console.log(`Storage Error:`, JSON.stringify(err));
      });
  };

  return (
    <Box fill align="center" justify="center" background="#3A3A3A">
      <Box
        fill="horizontal"
        direction="row"
        pad="16px"
        style={{ maxWidth: "800px", overflowX: "auto" }}
        background="#FAFAFA"
      >
        {imageKeys.map(key => (
          <LayzyImage key={key} imageKey={key} />
        ))}
      </Box>

      <Box
        fill="horizontal"
        align="center"
        justify="center"
        margin={{ vertical: "24px" }}
      >
        <Button
          label="Reload"
          style={{ width: "180px", height: "50px" }}
          onClick={() => {
            loadFromStorage();
          }}
        />
      </Box>
    </Box>
  );
};

export default StorageViewer;
