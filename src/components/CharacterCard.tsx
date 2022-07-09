import { FC } from "react";
import { CardContent, CardMedia, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

interface CharacterCardProps {
  name: string;
  image: string;
}

const CharacterCard: FC<CharacterCardProps> = ({ name, image }) => {
  return (
    <Paper sx={{ width: 200, margin: 2 }} elevation={5}>
      <CardMedia component={"img"} height="200" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
      </CardContent>
    </Paper>
  );
};

export default CharacterCard;
