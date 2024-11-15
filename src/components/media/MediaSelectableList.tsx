import React, { useState } from 'react';
import {
  Grid,
  Button,
  useTheme,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { MediaRef } from '../../pages/Media';
import MediaCardContent from './MediaCardContent';
import MediaCardForm from './MediaCardForm';
import {
  ImageRefSchema,
  VideoRefSchema
} from '@jakubkanna/labguy-front-schema';
import { getThumbnail } from '../../utils/helpers';

interface MediaSelectableListProps {
  mediaList: MediaRef[];
  selected: MediaRef[];
  setSelected: React.Dispatch<React.SetStateAction<MediaRef[]>>;
  setMediaList?: React.Dispatch<React.SetStateAction<MediaRef[]>>;
  variant?: 'simple' | 'advanced';
  single?: boolean;
  noEdit?: boolean;
}

const MediaSelectableList: React.FC<MediaSelectableListProps> = ({
  mediaList,
  selected,
  setSelected,
  setMediaList,
  variant = 'simple',
  single,
  noEdit = false
}) => {
  const theme = useTheme();
  const [editingMedia, setEditingMedia] = useState<MediaRef>(null);

  const isSelected = (media: MediaRef) =>
    selected.some((item) => item && media && item.etag === media.etag);

  const handleSelectClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clickedMedia: ImageRefSchema | VideoRefSchema
  ) => {
    e.stopPropagation();

    setSelected((prevList) => {
      const mediaExists = prevList.some(
        (media) => media && media.etag === clickedMedia.etag
      );

      if (single) return mediaExists ? [] : [clickedMedia];

      return mediaExists
        ? prevList.filter((media) => media && media.etag !== clickedMedia.etag)
        : [clickedMedia, ...prevList];
    });
  };

  const handleEditClick = (media: MediaRef) => {
    setEditingMedia((prevMedia: MediaRef) =>
      prevMedia && media && prevMedia.etag === media.etag ? null : media
    );
  };

  const mediaCardStyles = (media: MediaRef) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: isSelected(media)
      ? theme.palette.primary.light
      : 'transparent',
    color: isSelected(media) ? theme.palette.secondary.main : 'inherit',
    filter: isSelected(media) ? 'grayscale(0%)' : 'grayscale(100%)',
    '& a': {
      color: isSelected(media) ? theme.palette.secondary.main : 'inherit'
    }
  });

  return (
    <Grid container spacing={2}>
      {mediaList.map(
        (media) =>
          media && (
            <Grid
              item
              xs={editingMedia && editingMedia.etag === media.etag ? 6 : 3}
              sx={{ display: 'flex', flexDirection: 'column' }}
              key={uuid()}
            >
              <Card sx={mediaCardStyles(media)}>
                <Grid container>
                  <Grid
                    item
                    xs={
                      editingMedia && editingMedia.etag === media.etag ? 6 : 12
                    }
                    sx={{ maxHeight: '400px' }}
                  >
                    <CardMedia
                      component="img"
                      src={getThumbnail(media) || ''}
                      sx={{ height: '200px', width: '100%' }}
                    />
                    {variant === 'advanced' && (
                      <CardContent sx={{ padding: '0.75rem', flexGrow: 1 }}>
                        <MediaCardContent media={media} />
                      </CardContent>
                    )}
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item>
                        <Button
                          color="secondary"
                          onClick={(e) => handleSelectClick(e, media)}
                        >
                          {isSelected(media) ? 'Unselect' : 'Select'}
                        </Button>
                      </Grid>
                      {!noEdit && (
                        <Grid item>
                          <Button
                            color="secondary"
                            onClick={() => handleEditClick(media)}
                          >
                            {editingMedia && editingMedia.etag === media.etag
                              ? 'Close'
                              : 'Edit'}
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {setMediaList &&
                    editingMedia &&
                    editingMedia.etag === media.etag && (
                      <Grid
                        item
                        xs={6}
                        sx={{
                          backgroundColor: theme.palette.secondary.main,
                          padding: 2,
                          maxHeight: '400px',
                          overflow: 'auto'
                        }}
                      >
                        <MediaCardForm
                          media={media}
                          setEditingMedia={setEditingMedia}
                          setMediaList={setMediaList}
                        />
                      </Grid>
                    )}
                </Grid>
              </Card>
            </Grid>
          )
      )}
    </Grid>
  );
};

export default MediaSelectableList;
