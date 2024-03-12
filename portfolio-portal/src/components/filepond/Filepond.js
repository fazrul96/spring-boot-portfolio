import React, { Component } from "react";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageEdit,
    FilePondPluginImageTransform
);

class Filepond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  handleInit() {
    console.log("FilePond instance has initialised");
  }

  render() {
    return (
      <FilePond
        ref={(ref) => (this.pond = ref)}
        files={this.state.files}
        allowMultiple={true}
        oninit={() => this.handleInit()}
        onupdatefiles={(fileItems) => {
          this.setState({
            files: fileItems.map((fileItem) => fileItem.file),
          });
        }}
      />
    );
  }
}

export default Filepond;