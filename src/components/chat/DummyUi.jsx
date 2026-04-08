const DummyUI = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center max-w-sm">
        <h2 className="text-2xl font-semibold mb-3">
          No Conversation Selected
        </h2>

        <p className="text-gray-600 mb-2">
          You haven't started any conversation today.
        </p>

        <p className="text-gray-500 text-sm">
          Search for someone or start a new message to begin chatting.
        </p>
      </div>
    </div>
  );
};

export default DummyUI;
