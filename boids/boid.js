class Boid
{
	constructor()
	{
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.acceleration = createVector(2, -4);
		this.maxForce = 0.41;
		this.maxSpeed = 6.0;
		this.perceptionRadius = 50;
		this.size = 10;
	}

	edges()
	{
		if (this.position.x > width)
			this.position.x = 0;
		else if (this.position.x < 0)
			this.position.x = width;
		if (this.position.y > height)
			this.position.y = 0;
		else if (this.position.y < 0)
			this.position.y = height;
	}

	align(boids)
	{
		let steering = createVector();
		let d = 0;
		let total = 0;

		for (let other of boids)
		{
			d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other != this && d < this.perceptionRadius)
			{
				steering.add(other.velocity);
				++total;
			}
		}
		if (total > 0)
		{
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return (steering);
	}

	cohesion(boids)
	{
		let d = 0;
		let total = 0;
		let steering = createVector();

		for (let other of boids)
		{
			d = dist(this.position.x, this.position.y,
				other.position.x, other.position.y);
			if (other != this && d < this.perceptionRadius)
			{
				steering.add(other.position);
				++total;
			}
		}
		if (total > 0)
		{
			steering.div(total);
			steering.sub(this.position);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return (steering);
	}

	separation(boids)
	{
		let d = 0;
		let total = 0;
		let steering = createVector();

		for (let other of boids)
		{
			d = dist(this.position.x, this.position.y,
				other.position.x, other.position.y);
			if (other != this && d < this.perceptionRadius)
			{
				let diff = p5.Vector.sub(this.position, other.position);
				diff.div(d);
				steering.add(diff);
				++total;
			}
		}
		if (total > 0)
		{
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return (steering);
	}

	flock(boids)
	{
		let alignement = this.align(boids);
		let cohe = this.cohesion(boids);
		let separation = this.separation(boids);

		this.acceleration.add(alignement);
		this.acceleration.add(cohe);
		this.acceleration.add(separation);

	}

	update()
	{
		this.acceleration.limit(this.maxForce);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
	}

	show()
	{
		// landmark of the canvas ported to the entity
		stroke(0, 0, 255);
		line(this.position.x, this.position.y, this.position.x, this.position.y - 20);
		line(this.position.x, this.position.y, this.position.x + 20, this.position.y);
		
		// normalised axis of the entity
		stroke(0, 255, 0);
		let nv = createVector(this.velocity.x, this.velocity.y);
		let dv = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
		nv.x /= dv;
		nv.y /= dv;
		nv.x *= this.size;
		nv.y *= this.size;
		line(this.position.x - nv.x , this.position.y - nv.y,
			this.position.x + nv.x , this.position.y + nv.y);
		line(this.position.x - nv.y, this.position.y + nv.x,
			this.position.x + nv.y , this.position.y - nv.x);

		// red shape
		stroke(255, 0, 0);
		line(this.position.x - nv.x - nv.y , this.position.y - nv.y + nv.x,
			this.position.x + nv.x, this.position.y + nv.y);
		line(this.position.x + nv.x , this.position.y + nv.y,
			this.position.x - nv.x + nv.y, this.position.y - nv.y - nv.x);
		line(this.position.x, this.position.y,
			this.position.x - nv.x - nv.y , this.position.y - nv.y + nv.x);
		line(this.position.x, this.position.y,
			this.position.x - nv.x + nv.y, this.position.y - nv.y - nv.x);

	}

}
