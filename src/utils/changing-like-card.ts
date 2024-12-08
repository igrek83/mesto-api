import Card from '../models/card';

export default async (
  cardId: string,
  userId: string,
  statusActive: boolean,
) => {
  if (statusActive) {
    return Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  );
};
