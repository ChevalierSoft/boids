class Boid
{
	constructor()
	{
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.acceleration = createVector(2, 4);
		this.maxForce = 0.21;
		this.maxSpeed = 4.0;
		this.perceptionRadius = 50;
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
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
	}

	show()
	{
		strokeWeight(16);
		stroke(255);
		point(this.position.x, this.position.y);
	}

	// mouseClicked()
	// {
	// 	let	mouse = dist(this.position.x, this.position.y, mouseX, mouseY);	
	// 	this.acceleration.add(mouse);
	// 	rect(100, 100, 100, 100);
	// }
}
