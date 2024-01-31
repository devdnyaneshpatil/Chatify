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
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: frdId} } },
      ],
    }).populate("users","-password").populate("latestMessage")
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

const fetchChats=async(req,res)=>{
  try {
    const results = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    if (results.length > 0) {
      const populatedResults = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      res.status(200).json({ msg: populatedResults });
    } else {
      res.status(200).json({ msg: "No chats found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createGroup=async(req,res)=>{
  if (!req.body.users || !req.body.name) {
    res.status(201).json({ msg: "please fill all the fields" });
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.status(201).json({ msg: "more than 2 users required" });
  }
  try {
    users.push(req.user._id);
    const groupChat = new ChatModel({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });
    await groupChat.save();

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json({ msg: fullGroupChat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const renameGroup=async(req,res)=>{
   const { chatId, chatName } = req.body;
   try {
     const updatedName = await ChatModel.findByIdAndUpdate(
       chatId,
       { chatName },
       { new: true }
     )
       .populate("users", "-password")
       .populate("groupAdmin", "-password");
     res
       .status(200)
       .json({ msg: "Chat has Been Updated", updatedChat: updatedName });
   } catch (error) {
     res.status(400).send({ error: error.message });
   }
}

const addToGroup=async(req,res)=>{
   const { chatId, newUserId } = req.body;
   try {
     const added = await ChatModel.findByIdAndUpdate(
       chatId,
       {
         $push: { users: newUserId },
       },
       { new: true }
     )
       .populate("users", "-password")
       .populate("groupAdmin", "-password");
     res.status(200).json({ msg: "user has been added", updatedChat: added });
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
}

const removeFromGroup=async(req,res)=>{
    const { chatId, newUserId } = req.body;
    try {
      const removed = await ChatModel.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: newUserId },
        },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      res
        .status(200)
        .json({ msg: "user has been removed", updatedChat: removed });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

module.exports = { getChat ,fetchChats,createGroup,renameGroup,addToGroup,removeFromGroup};
