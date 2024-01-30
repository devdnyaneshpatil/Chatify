const ChatModel = require("../models/chat.model");
const UserModel = require("../models/user.model");

const getChat = async (req, res) => {
  const { frdId } = req.body;
  if (!frdId) {
    res.status(400).json({ msg: "Not found frdId" });
  }
  try {
    let isChat = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemmatch: { $eq: req.user._id } } },
        { users: { $elemmatch: { $eq: frdId} } },
      ],
    }).populate("users","-password").populate("latstMessage")
    isChat=await UserModel.populate(isChat,{
        path:"latestMessage",
        select:"name pic email"
    })
    if(isChat.length>0){
        res.status(200).json({msg:isChat[0]})
    }else{
        const chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,frdId]
        }
       const createdChat = new ChatModel(chatData);
       await createdChat.save();

       const fullChat = await ChatModel.findOne({
         _id: createdChat._id,
       }).populate("users", "-password");
       res.status(200).json({ msg: fullChat });

    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getChat };
