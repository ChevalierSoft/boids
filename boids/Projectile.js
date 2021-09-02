class Projectile
{
	constructor(_pos, _color)
	{
		this.position = createVector(_pos.x, _pos.y);
		this.velocity = createVector();
		this.lifetime = 120;
		this.speed = 10;
		this.color = _color;
	}

	update()
	{
		this.position.add(this.velocity);
		if (this.lifetime <= 0)
			delete this;
		if (this.lifetime >= 0)
			--this.lifetime;
	}

	show()
	{
		stroke(this.color);
		strokeWeight(6);
		point(this.position.x, this.position.y);
	}
}