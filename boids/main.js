const g_flock = [];

function setup()
{
	createCanvas(800, 900);
	for (let i = 0; i < 200; ++i)
		g_flock.push(new Boid());
}


function draw()
{
	background(51, 51, 51, 40);
	// background(51, 51, 51);
	for (let boid of g_flock)
	{
		boid.edges();
		boid.flock(g_flock);
		boid.update();
		boid.show();
	}
}

function mouseDragged()
{
	let mouse = createVector(mouseX, mouseY);
	// let wwh = createVector(width, height);

	// mouse.div(wwh);
	mouse.x /= width;
	mouse.y /= height;
	mouse.x -= 0.5;
	mouse.y -= 0.5;

	mouse.x *= 2;
	mouse.y *= 2;
	
	fill(255, 0, 0);
	text("vmouse : ", mouseX, mouseY);
	text(mouse.x, mouseX + 50, mouseY);
	text(mouse.y, mouseX + 80, mouseY);

	for (let boid of g_flock)
	{
		// let	mouse = dist( mouseX, mouseY, Width / 2, Height /);
		// mouse.setMag(boid.maxSpeed);
		// mouse.sub(boid.velocity);

		boid.acceleration.add(mouse); //createVector(mouseX, mouseY);
		
	}
	// rect(mouseX, mouseY, 100, 100);

	// let tmp = new Boid();
	// tmp.position = createVector(mouseX, mouseY);
	// g_flock.push(tmp);
}