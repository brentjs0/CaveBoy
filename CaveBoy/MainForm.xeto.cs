using CaveBoy.Extensions;
using CaveBoy.GameObjects;
using CaveBoy.Widgets;
using Eto.Drawing;
using Eto.Forms;
using Eto.Serialization.Xaml;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CaveBoy
{
	public class MainForm : Form
	{
		private Drawable _drawable;

		public MainForm()
		{
			XamlReader.Load(this);

			_drawable = (Drawable)Children.FirstOrDefault(child => child.ID == "drawable");
			_drawable.Paint += PaintCanvas;
		}

		protected void PaintCanvas(object sender, PaintEventArgs e)
		{
			string paletteGroup =
				"000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666" +
				"000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666" +
				"000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668" +
				"000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666" +
				"000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666" +
				"000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666";

			int paletteNumber = 0;

			foreach (IEnumerable<char> palette in paletteGroup.InSlicesOf(48))
			{
				int colorNumber = 0;

				foreach (IEnumerable<char> color in palette.InSlicesOf(3))
				{
					RelativeGraphics relativeGraphics = new RelativeGraphics(e.Graphics, colorNumber, paletteNumber, (1 * colorNumber) + 1, (1 * paletteNumber) + 1, 10);
					relativeGraphics.FillRectangle(new SFCColor(color).EtoColor, 0, 0, 1, 1);

					++colorNumber;
				}

				++paletteNumber;
			}
		}


		protected void HandleClickMe(object sender, EventArgs e)
		{
			_drawable.Update(new Rectangle(0, 0, _drawable.Width, 9));
		}

		protected void HandleAbout(object sender, EventArgs e)
		{
			new AboutDialog().ShowDialog(this);
		}

		protected void HandleQuit(object sender, EventArgs e)
		{
			Application.Instance.Quit();
		}
	}
}
