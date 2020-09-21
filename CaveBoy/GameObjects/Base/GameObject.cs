using System;
using System.Collections.Generic;
using System.Text;

namespace CaveBoy.GameObjects.Base
{
    public abstract class GameObject<TGameObject> : GameObject where TGameObject : GameObject { }

    public abstract class GameObject : IGameObject
    {
        public sealed override string ToString()
        {
            return PerformToString();
        }

        public abstract string PerformToString();
    }
}
