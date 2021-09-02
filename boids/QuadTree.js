class Rectangle
{
	constructor(x, y, w, h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	contains(p)
	{
		return ( p.position.x > this.x - this.w
			&& p.position.x < this.x + this.w
			&& p.position.y > this.y - this.h
			&& p.position.y < this.y + this.h
			);
	}
}

class QuadTree
{
	constructor(bondary, capacity)
	{
		this.boundary = bondary;
		this.capacity = capacity;
		this.points = [];
		this.divided = false;
	}

	subdivide()
	{
		console.log("sub");
		let tmp;
	
		tmp = new Rectangle(this.boundary.x - this.boundary.w/2,
			this.boundary.y - this.boundary.h/2,
			this.boundary.w/2,
			this.boundary.h/2);
		this.nw = new QuadTree(tmp, this.capacity);

		tmp = new Rectangle(this.boundary.x + this.boundary.w/2,
			this.boundary.y - this.boundary.h/2,
			this.boundary.w/2,
			this.boundary.h/2);
		this.ne = new QuadTree(tmp, this.capacity);

		tmp = new Rectangle(this.boundary.x - this.boundary.w/2,
			this.boundary.y + this.boundary.h/2,
			this.boundary.w/2,
			this.boundary.h/2);
		this.sw = new QuadTree(tmp, this.capacity);

		tmp = new Rectangle(this.boundary.x + this.boundary.w/2,
			this.boundary.y + this.boundary.h/2,
			this.boundary.w/2,
			this.boundary.h/2);
		this.se = new QuadTree(tmp, this.capacity);

		this.divided = true;

	}

	insert(p)
	{
		if (!this.boundary.contains(p))
		{
			console.log("oob");
			return ;
		}

		if (this.points.length < this.capacity)
		{
			this.points.push(p);
		}
		else
		{
			if (this.divided == false)
			{
				this.subdivide();
			}
			this.ne.insert(p);
			this.nw.insert(p);
			this.se.insert(p);
			this.sw.insert(p);
		}
	}

	show()
	{
		stroke(255);
		noFill();
		rectMode(CENTER);
		rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
		if (this.divided)
		{
			this.nw.show();
			this.ne.show();
			this.sw.show();
			this.se.show();
		}
	}
}