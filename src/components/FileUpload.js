import React, { Component } from 'react';

class FileStore {
  constructor() {
    this._files = [];
    this.fileLength = 0;
  }

  putFiles(data) {
    this._files = data;
    this.fileLength = this._files.length;
  }

  getFiles(index) {
    return Number.isInteger(index) ? this._files[index] : this._files;
  }
}

const fileStore = new FileStore();

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragActive: false
    };
    this.open = this.open.bind(this);
    this._handleUploadChange = this._handleUploadChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
  }

  componentDidMount() {
    this.enterCounter = 0;
  }

  open() {
    this.refs.fileInput.click();
  }

  getFile(index) {
    return fileStore.getFiles(index);
  }

  getImagePreview(index = 0) {
    let reader = new FileReader();
    let file =  fileStore.getFiles(index);
    return new Promise( ( resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject(null);
      };
    });
  }
  /**
   * 一次取得所有 Preview ( 非 Promise )
   * @prama (Integer) index 從第幾個開始
   */
  getAllImagePreview(index = 0, finishFunction = () => {}, arr = []) {
    if (index < fileStore.fileLength) {
      this.getImagePreview(index).then((data) => {
        arr = arr.concat(data);
        this.getAllImagePreview( index + 1, finishFunction, arr);
      });
    } else {
      finishFunction(arr);
    };
  }

  _handleUploadChange(e) {
    e.preventDefault();
    fileStore.putFiles(e.target.files);
    this.props.onChange.call(this, fileStore.getFiles(), e);
  }

  _onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isDragActive: true
    });
  }

  _onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isDragActive: false
    });
  }

  _onDrop(e) {
    e.preventDefault();
    this.enterCounter = 0; // init
    fileStore.putFiles(e.dataTransfer.files);
    this.props.onChange.call(this, fileStore.getFiles(), e);
    this.setState({
      isDragActive: false
    });
  }

  render() {
    let isMutiFile = this.props.multiple;
    let styles = {
      dropZone: {
        border: '2px dashed #ccc',
        minHeight: '100px',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center',
        cursor: 'pointer'
      },
      
      fileSelect: {
        display: 'none'
      }
    };

    for (let i in this.props.style) {
      if (this.props.style.hasOwnProperty(i))
        styles[i] = this.props.style[i];
    }
    
    if (this.state.isDragActive)
      styles.dropZone.border = '2px dashed #D81B60';  

    return (
      <div 
        style={styles.dropZone}
        onDragOver={this._onDragOver}
        onDragLeave={this._onDragLeave}
        onDrop={this._onDrop}
        onClick={this.open}
      >
        <input
          type="file" 
          ref="fileInput" 
          multiple={isMutiFile}  
          style={styles.fileSelect}
          onChange={this._handleUploadChange}
        />
        {this.props.children}
      </div>
    );

  }
}
