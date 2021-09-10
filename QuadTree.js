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
		return (
			p.position.x >= this.x - this.w &&
			p.position.x <= this.x + this.w &&
			p.position.y >= this.y - this.h &&
			p.position.y <= this.y + this.h
			);

	}

	intersects(range)
	{
		return !(
			range.x - range.w > this.x + this.w ||
			range.x + range.w < this.x - this.w ||
			range.y - range.h > this.y + this.h ||
			range.y + range.h < this.y - this.h
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
		let tmp;
	
		tmp = new Rectangle(this.boundary.x - this.boundary.w / 2,
			this.boundary.y - this.boundary.h / 2,
			this.boundary.w / 2,
			this.boundary.h / 2);
		this.nw = new QuadTree(tmp, this.capacity);

		tmp = new Rectangle(this.boundary.x + this.boundary.w / 2,
			this.boundary.y - this.boundary.h / 2,
			this.boundary.w / 2,
			this.boundary.h / 2);
		this.ne = new QuadTree(tmp, this.capacity);

		tmp = new Rectangle(this.boundary.x - this.boundary.w / 2,
			this.boundary.y + this.boundary.h / 2,
			this.boundary.w / 2,
			this.boundary.h / 2);
		this.sw = new QuadTree(tmp, this.capacity);

		tmp = new Rectangle(this.boundary.x + this.boundary.w / 2,
			this.boundary.y + this.boundary.h / 2,
			this.boundary.w / 2,
			this.boundary.h / 2);
		this.se = new QuadTree(tmp, this.capacity);

		this.divided = true;

	}

	insert(p)
	{
		if (!this.boundary.contains(p))
			return false;

		if (this.points.length < this.capacity)
		{
			this.points.push(p);
			return (true);
		}
		else
		{
			if (this.divided == false)
				this.subdivide();
			if (this.nw.insert(p) ||
				this.ne.insert(p) ||
				this.sw.insert(p) ||
				this.se.insert(p))
				return (true);
		}
		return (false);
	}

	query(range, found = [])
	{
		if (!range.intersects(this.boundary))
			return found;

		for (let p of this.points)
		{
			if (range.contains(p))
				found.push(p);
		}

		if (this.divided)
		{
			this.nw.query(range, found);
			this.ne.query(range, found);
			this.se.query(range, found);
			this.sw.query(range, found);
		}
		return (found);
	}

	show()
	{
		stroke(255);
		strokeWeight(1);
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