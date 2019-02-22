import { createUploadLink } from 'apollo-upload-client';
import { environment } from '@env/environment';


const UPLOAD_URI = `${environment.HOST}${environment.GRAPHQL_PATH}`;
const uploadLink = createUploadLink({ uri: UPLOAD_URI });

const isFile = value =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob) ||
  (typeof FileList !== 'undefined' && value instanceof FileList);

const isUpload = ({ variables }) => Object.values(variables).some(isFile);

export { uploadLink, isFile, isUpload };
