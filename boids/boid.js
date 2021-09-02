class Boid
{
	constructor(rw, rh)
	{
		this.position = createVector(rw, rh);
		this.velocity = p5.Vector.random2D();
		this.acceleration = createVector(2, -4);
		this.maxForce = 0.41;
		this.maxSpeed = 6.0;
		this.maxSpeedSeparation = 7.0;
		this.perceptionRadius = 50;
		this.fireRadius = 200;
		this.size = 10;
		this.color = [random(255), random(255), random(255)];
		this.cd = 0;
		this.icd = 120;
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
			steering.setMag(this.maxSpeedSeparation);
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
		// setting up the normalised vector
		let nv = createVector(this.velocity.x, this.velocity.y);
		let dv = sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
		nv.x /= dv;
		nv.y /= dv;
		nv.x *= this.size;
		nv.y *= this.size;

		strokeWeight(1);

		// // landmark of the canvas ported to the entity
		// stroke(0, 0, 255);
		// line(this.position.x, this.position.y, this.position.x, this.position.y - 20);
		// line(this.position.x, this.position.y, this.position.x + 20, this.position.y);
		
		// // normalised axis of the entity
		// stroke(0, 255, 0);
		// line(this.position.x - nv.x , this.position.y - nv.y,
		// 	this.position.x + nv.x , this.position.y + nv.y);
		// line(this.position.x - nv.y, this.position.y + nv.x,
		// 	this.position.x + nv.y , this.position.y - nv.x);
		
		// // fireRadius
		// circle(this.position.x, this.position.y, this.fireRadius * 2);

		// final shape
		noFill();
		stroke(this.color);
		line(this.position.x, this.position.y,
			this.position.x + nv.x, this.position.y + nv.y);
		line(this.position.x - nv.x - nv.y , this.position.y - nv.y + nv.x,
			this.position.x + nv.x, this.position.y + nv.y);
		line(this.position.x + nv.x , this.position.y + nv.y,
			this.position.x - nv.x + nv.y, this.position.y - nv.y - nv.x);
		line(this.position.x, this.position.y,
			this.position.x - nv.x - nv.y , this.position.y - nv.y + nv.x);
		line(this.position.x, this.position.y,
			this.position.x - nv.x + nv.y, this.position.y - nv.y - nv.x);

	}

	fire(g_projectiles)
	{
		let d = dist(this.position.x, this.position.y, mouseX, mouseY);
		if (d <= this.fireRadius && this.cd <= 0)
		{
			let tmp = new Projectile(this.position, this.color);

			tmp.velocity.x = mouseX - this.position.x;
			tmp.velocity.y = mouseY - this.position.y;
			let dv = sqrt(tmp.velocity.x * tmp.velocity.x
				+ tmp.velocity.y * tmp.velocity.y);
			tmp.velocity.x /= dv;
			tmp.velocity.y /= dv;
			tmp.velocity.x *= tmp.speed;
			tmp.velocity.y *= tmp.speed;
			g_projectiles.push(tmp);
			this.cd = this.icd;
		}
		else if (this.cd > 0)
			--this.cd;
	}

	intersects(other)
	{
		let d = dist(this.x, this.y, other.x, other.y);
		return (d < this.size + other.size);
	}

	highLight()
	{
		rectMode(CENTER);
		stroke(200, 0, 0, 150);
		rect(this.position.x, this.position.y, 30, 30);
	}

}

Boid.id = 0;	// static variable
