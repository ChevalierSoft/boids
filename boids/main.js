let g_flock = [];

function setup()
{
	let nb_elem_at_startup = 200;

	createCanvas(950, 950);
	for (let i = 0; i < nb_elem_at_startup; ++i)
		g_flock.push(new Boid());
}

function draw()
{
	// background(51, 51, 51, 40);
	background(51);

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
	for (let boid of g_flock)
	{
		let bmouse = createVector(mouseX - boid.position.x, mouseY - boid.position.y);
		boid.acceleration.add(bmouse);
	}	
}

function mousePressed()
{
	let tmp = new Boid();
	tmp.position = createVector(mouseX, mouseY);
	g_flock.push(tmp);
}
