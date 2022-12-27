import User from "../models/User.js";
/* Read */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(User);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*upadate */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.friendId(friendId);

    // if the friend is already in the users friend list
    if (user.friends.includes(friendId)) {
      // remove friend from users friendlist
      user.friends = user.friends.filter((id) => id !== friendId);
      // remove user form that friends friendlist
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // if the friend is not in the users friendlist

      // add the friend to users friend list
      user.friends.push(friendId);
      // add users to friends friendList
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
