import { Box, Stack, Typography } from '@mui/material';

export interface MovieDetailCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const MovieDetailCard = ({
  icon,
  title,
  description,
}: MovieDetailCardProps) => {
  return (
    <Box
      sx={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
      }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        {icon}
        <Typography variant="body1">{description}</Typography>
      </Stack>
    </Box>
  );
};

export default MovieDetailCard;
