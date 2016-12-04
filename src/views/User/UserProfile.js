import React, {Component} from 'react';
import FileUpload from '../../components/FileUpload';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import Chip from 'material-ui/Chip';
import Href from '../../components/Href';
import AvatarEditor from 'react-avatar-editor';
import Container from '../../components/Container';
import ComicElement from '../Comic/ComicElement';
import UserModule from '../../module/UserModule';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarHover: false,
      avatarChanger: false,
      cropImage: '',
      avatarCropScale: 1,
      comics: []
    };

    /* 取得個人資訊 */
    UserModule.updateInfo();
    
    /* 取得個人漫畫 */
    new FetchModule()
      .setUrl(apiUrl.search.searchByPublisher)
      .replaceVariable({
        name: UserModule.getUserInfo('userId'),
        page: 1
      })
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState({
          comics: data.comics
        });
      });

    this._handleAvatarChangerClose = this._handleAvatarChangerClose.bind(this);
    this._changeImage = this._changeImage.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  
  _handleAvatarChangerClose() {
    this.setState({avatarChanger: false});
  }
  
  _changeImage(data) {
    this.refs.imageSelecter.getImagePreview(0).then((data) => {
      this.setState({
        cropImage: data
      });
    });
  }

  _handleSubmit() {
    let imageURL = this.refs.avatarEditor.getImage().toDataURL('image/jpeg', 1.0);
    let blobBin = atob(imageURL.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    let file = new Blob([new Uint8Array(array)], {type: 'image/jpg', encoding: 'utf-8'});
    
    new FetchModule()
      .setUrl(apiUrl.user.uploadUserAvatar)
      .auth()
      .setCors('cors')
      .setData({image: file})
      .setMethod('POST')
      .setType('json')
      .send()
      .then((data) => {
        if (data.status === 'success') {
          this.setState({avatarChanger: false,  avatarType: data.user.avatar});
        };
      });
  }

  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this._handleAvatarChangerClose}
      />,
      <FlatButton
        label="送出"
        primary={true}
        disabled={(this.state.cropImage)?false:true}
        onTouchTap={this._handleSubmit}
      />,
    ];
    return (
      <div>
        <div style={styles.avatarBackgroundCover}>
          {/* Banner 放置區 */}
        </div>
        <Paper style={styles.userProfile} zDepth={2}>
          <Container style={styles.container}>
            <Avatar 
              size={100} 
              style={styles.avatar}
              onMouseEnter = {() => this.setState({avatarHover: true})}
              onMouseLeave = {() => this.setState({avatarHover: false})}
              onTouchTap = {()=>this.setState({avatarChanger: true})}
              >
              {
                (!UserModule.getUserInfo('avatar')) ? 
                  UserModule.getUserInfo('userName').substring( 0, 1) :
                  <img src={apiUrl.getReplaceUrl(apiUrl.user.avatar, {
                      userId: UserModule.getUserInfo('userId'),
                      avatarType: UserModule.getUserInfo('avatar')
                    })+'?time='+ Date.now()} 
                    style={styles.avatarImage}
                  />
              }
              {
                this.state.avatarHover &&
                <FlatButton backgroundColor={'rgba(0,0,0,0.5)'} style={styles.changeAvatar}>+</FlatButton>
              }
            </Avatar>
            <div style={styles.userData}>
              {UserModule.getUserInfo('userName')}
              <span style={styles.userEmail}>
                {UserModule.getUserInfo('email')}
                {
                  UserModule.getUserInfo('from') !== '' &&
                  <Chip 
                    style={styles.comeFromChip}
                    labelStyle={styles.comeFromChipLabel}
                    backgroundColor={styles.comeFromChip.backgroundColor}
                  >
                    {UserModule.getUserInfo('from')}
                  </Chip>
                }
              </span>
              {
                UserModule.isFromSocial() &&
                <span>
                  <Href href={apiUrl.front.changeUserProfile}><FlatButton style={styles.chgInfoButton}>編輯個人資訊</FlatButton></Href>
                </span>
              }
            </div>
            <ComicElement comicData={this.state.comics} linkUrl={apiUrl.front.comicInfo} />
          </Container>
          <Dialog
            title="修改大頭貼"
            actions={actions}
            modal={true}
            autoScrollBodyContent={true}
            open={this.state.avatarChanger}
            contentStyle={{overflowY: 'auto', textAlign: 'center'}}
          >
            <Container>
              {
                this.state.cropImage &&
                <div>
                  <AvatarEditor
                    ref="avatarEditor"
                    image={this.state.cropImage}
                    width={250}
                    height={250}
                    border={20}
                    color={[255, 255, 255, 0.6]} // RGBA 
                    scale={this.state.avatarCropScale} 
                  />
                  <div>
                    <span style={{width: '30%', display: 'inline-block', verticalAlign: 'center', lineHeight: 4}}>
                      放大倍數: {this.state.avatarCropScale}x
                    </span>
                    <Slider 
                      style={{width: '70%', display: 'inline-block'}}
                      sliderStyle={{marginBottom: 10}}
                      default={1} 
                      step={0.4} 
                      max={5} 
                      min={1} 
                      value={this.state.avatarCropScale}
                      onChange={(e, value) => {this.setState({avatarCropScale: value})}} 
                    />
                  </div>
                </div>
              }
              <FileUpload
                ref="imageSelecter"
                onChange={this._changeImage}
              >
                上傳照片
              </FileUpload>
            </Container>
          </Dialog>
        </Paper>
      </div>
    );
  }
}

export default UserProfile;
