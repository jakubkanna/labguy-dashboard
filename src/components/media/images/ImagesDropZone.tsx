import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

export interface FileWithPreview extends File {
  preview: string;
}

interface DropZoneProps {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const
};

const ImagesDropZone: React.FC<DropZoneProps> = ({ files, setFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <Box>
      <Box
        {...getRootProps({
          className: 'dropzone',
          sx: {
            border: `1px dashed ${'rgba(151,151,151,0.4)'}`,
            minHeight: '100px',
            borderRadius: 1,
            padding: 2,
            display: 'flex',
            justifContent: 'centner',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(151,151,151,0.1)'
            }
          }
        })}
      >
        <input {...getInputProps()} />
        <Typography variant="body2" sx={{ opacity: 0.5 }}>
          Drag 'n' drop{' '}
          <Box fontWeight={900} component={'span'}>
            images
          </Box>{' '}
          here, or click to select files
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.5 }}>
          Max size 10mb. Only .jpeg, .jpg, .png, .webp formats are allowed.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 2
        }}
      >
        {thumbs}
      </Box>
    </Box>
  );
};
export default ImagesDropZone;
